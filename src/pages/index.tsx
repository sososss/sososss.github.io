import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

import './styles/index.scss';

interface IndexPageProps {
  path: string;
  data: any;
}

const IndexPage = (props: IndexPageProps) => {
  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <div className="index-wrap">
        <div className="index-post-list-wrap">
          <PostList posts={posts} />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 100) {
      edges {
        node {
          excerpt(truncate: true, format: PLAIN)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            update(formatString: "MMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;

export default IndexPage;
