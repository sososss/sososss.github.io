const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const config = require('./config');

// Create Pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/Post/index.tsx');
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              update(formatString: "YYYY-MM-DD")
              date(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const getSeries = target => {
    const splitSlug = target.split('_');
    if (splitSlug.length >= 3) {
      return 0;
    }

    const seriesNum = splitSlug[splitSlug.length - 1].split('/').join('');
    const isNum = !/[^0-9]/g.test(seriesNum);

    if (isNum) {
      return parseInt(seriesNum, 10);
    }

    return 0;
  }

  const { edges } = result.data.allMarkdownRemark;

  edges.forEach(({ node }) => {
    const { fields, frontmatter } = node;
    const { slug } = fields;
    const { date, update } = frontmatter;

    let filteredEdges = [];
    const series = [];

    if (getSeries(slug)) {
      filteredEdges = edges.filter(edge => {
        const fieldsSlug = edge.node.fields.slug;
        const splitFieldsSlug = fieldsSlug.split('_');
        if (splitFieldsSlug.length >= 3) {
          return false;
        }

        if (slug.split('_').length > 1  &&
          slug.split('_')[0] === splitFieldsSlug[0]) {
          return true;
        }
      });

      if (filteredEdges.length) {
        for (const edge of filteredEdges) {
          const seriesNum = getSeries(edge.node.fields.slug);

          if (seriesNum) {
            series.push({
              slug: edge.node.fields.slug,
              title: edge.node.frontmatter.title,
              num: seriesNum
            });
          }
        }

        series.sort((a, b) => {
          return a.num - b.num;
        });
      }
    }

    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug,
        series,
        lastmod: update.includes('0001') ? date : update
      }
    });
  });
};

// Create Nodes
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    
    const rewriteSlug = slug => {
      // '/'가 경로명에 포함되는 걸 막기위해 제거
      if (slug.match(/\//g).length > 2) {
        let tempStr = slug.split('/');
        slug = `/${tempStr[tempStr.length -2]}/`;
      }

      // 파일명에 날짜가 포함시킨걸 제거
      const dayRegExp = /\/(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-/;
      if (slug.match(dayRegExp)) {
        slug = '/' + slug.replace(dayRegExp, '');
      }
      
      return slug;
    }
    
    const rewriteNode = node => {
      // title 에는 "가 포함되지 않도록 경고
      if (node.frontmatter.title.includes('"')) {
        console.warn(`
It is not recommended to include " in the title.
- file: ${node.fileAbsolutePath}
- title: ${node.frontmatter.title}
        `);
      }

      // Markdown 파일에 keywords가 비어있을 경우 오류나지 않게 추가
      if (!node.frontmatter.keywords) {
        node.frontmatter.keywords = [
          config.title,
          config.author
        ]
      }
      
      // Markdown tags 처리
      if (!node.frontmatter.tags || node.frontmatter.tags === '') {
        node.frontmatter.tags = [ 'undefined' ];
      } else if (typeof node.frontmatter.tags === 'string') {
        node.frontmatter.tags = [ node.frontmatter.tags ];
      }

      if (node.frontmatter.date.includes('+')) {
        const date = new Date(node.frontmatter.date.split('+')[0]);
        node.frontmatter.date = date;
      } else {
        node.frontmatter.date = new Date(node.frontmatter.date);
      }

      // Markdown 에 update 가 없을 경우 처리
      if (!node.frontmatter.update) {
        node.frontmatter.update = '0001-01-01T00:00:00.000Z';
      }

      return node;
    }


    createNodeField({
      name: 'slug',
      node: rewriteNode(node),
      value: rewriteSlug(slug)
    });
  }
};
