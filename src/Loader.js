import loader from './loader.gif';

function Loader() {
  return (
    <div className="loader">
      <img src={loader} alt="loading gif" />
      <p className="loadingText">BRB, Samus is going to fetch you a new game</p>
    </div>
  );
}

export default Loader;
