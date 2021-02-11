import * as React from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'gatsby';

import './postList.scss';

interface PostListProps {
  posts: any[];
}

const PostList = (props: PostListProps) => {
  const { posts } = props;
  const [ showCount, setShowCount ] = useState(10);
  const [
    currentPostList,
    setCurrentPostList
  ] = useState<JSX.Element[]>([]);

  const sortedPosts = useMemo(() => {
    posts.sort((a: any, b: any) => {
      const aFrontmatter = a.node.frontmatter;
      const bFrontmatter = b.node.frontmatter;

      const aDate = new Date(aFrontmatter.update.includes('0001') ? aFrontmatter.date : aFrontmatter.update);
      const bDate = new Date(bFrontmatter.update.includes('0001') ? bFrontmatter.date : bFrontmatter.update);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;

      return 0;
    });
    return posts;
  }, [posts]);

  const expandPostList = useCallback((list: any) => {
    const mapToList = list.map((post: any) => {
      const { node } = post;
      const { excerpt, fields, frontmatter } = node;
      const { slug } = fields;
      const { date, title, tags } = frontmatter;

      let update = frontmatter.update;
      if (Number(update.split(',')[1]) === 1) update = null;

      const mapTag = tags.map((tag: string) => {
        if (tag === 'undefined') return;

        return (
          <div key={`${slug}-${tag}`} className="tag">
            <span>
              <Link to={`/tags#${tag}`}>
                {`#${tag}`}
              </Link>
            </span>
          </div>
        )
      });

      return (
        <li key={slug} className="post">
          <article>
            <h2 className="title">
              <Link to={slug}>{title}</Link>
            </h2>
            <div className="info">
              <div className="date-wrap">
                <span className="date">{date}</span>
                {update ? <span className="update">&nbsp;{`(Updated: ${update}`}</span> : null}
              </div>
              {tags.length && tags[0] !== 'undefined' ? <span className="info-dot">.</span> : null}
              <ul className="tag-list">{mapTag}</ul>
            </div>
            <Link to={slug}>
              <span className="excerpt">{excerpt}</span>
            </Link>
          </article>
        </li>
      );
    });

    setCurrentPostList((prev: JSX.Element[]) => {
      return [...prev, ...mapToList];
    });
  }, []);

  useEffect(() => {
    if (showCount > 0 && showCount !== 10) {
      expandPostList(sortedPosts.slice(currentPostList.length, showCount));
    }
  }, [showCount]);

  useEffect(() => {
    if (currentPostList.length) setCurrentPostList([]);

    setShowCount((prev: number) => {
      if (prev === 10) expandPostList(sortedPosts.slice(0, 10));
      return 10;
    });
  }, [sortedPosts]);

  return (
    <div className="post-list">
      <ul>{currentPostList}</ul>
    </div>
  );
}

export default PostList;
