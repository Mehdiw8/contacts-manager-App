/*
 * NOTE Higher Order Component
 */
const Colorfull = (WrappedComponent) => {
  const colors = [
    'red',
    'blue',
    'green',
    'black',
    'gray',
    'yellow',
    'brown',
  ];
  let randomColor = colors[Math.floor(Math.random() * 7)];
//   let className = `bg-${randomColor}`;

  return (props) => {
    return (
      <div style={{backgroundColor : randomColor}}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default Colorfull;
