import Head from 'next/head';
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | Ignews</title>
      </Head>

      <main className={styles.mainContainer}>
        <section>
          <span>👏 Hey, welcome</span>

          <h1>
            News about <br /> the <span>React</span> world
          </h1>

          <p>
            Get acess to all the publications
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L3WhzLykREpqk7xrpZKwG6d')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}
