import logo from './assets/react.svg'

function Header() {
  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div style={{ height: 100, width: 100 }}>
        <img src={logo} alt="Code The Dream Logo" />
      </div>
    </div>
  );
}

export default Header