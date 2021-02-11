import * as React from 'react';
import { graphql } from 'gatsby';

import './post.scss';

import Layout from '../../components/Layout';

interface PostProps {
  data: any;
  pageContext: {
    slug: string;
    series: any[];
    lastmod: string;
  }
}

const Post = (props: PostProps) => {
  const { data, pageContext } = props;
  const { markdownRemark } = data;
  const { html } = markdownRemark;

  return (
    <>
      <Layout>
        <div className="blog-post-container">
          <div className="blog-post">
            <div className="blog-post-title"></div>
            <div className="blog-post-info"></div>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;

export default Post;
