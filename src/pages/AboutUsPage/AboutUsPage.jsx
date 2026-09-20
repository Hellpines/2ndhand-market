import Layout from '../../components/Layout/Layout';
import style from './AboutUsPage.module.css';

export default function AboutUsPage() {
  return (
    <Layout contentClassName={style.content}>
      <h1 className={style.title}>About Us</h1>
      <p className={style.description}>
        2ND HAND MARKET is a marketplace that connects conscious buyers and sellers of quality pre-loved goods. We make sustainable shopping simple by offering clear, honest listings, quality checks, and fair pricing. Our mission is to extend the life of products, reduce waste, and help people discover meaningful, affordable finds. Whether you want to sell something you no longer need or find a unique item, we make the experience safe, easy, and community-minded.
      </p>
    </Layout>
  );
}