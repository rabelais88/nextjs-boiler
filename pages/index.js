import styleTest from '../styles/test.scss';
import Helmet from 'react-helmet';
const Home = () => {
  return (
  <div className="example">
    <Helmet
      title='Index | Hello next.js!'
      meta={[{ property: 'og:title', content: 'Index' }]}
    />
    Welcome to Next.js!
  </div>);
};

Home.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  console.log(props);
  return [];
};

export default Home;