import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
import Head from 'next/head';

import styles from './styles.module.scss';
import Link from 'next/link';

interface Content {
  type: string,
  text: string
}

interface Post {
  slug: string;
  title: string;
  except: string;
  updatedAt: string;
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.except}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      except: post.data.content.find((content: Content) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date!).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}