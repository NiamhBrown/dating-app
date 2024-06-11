const User = (props) => {

    const incriment = () => {
        props.setPos(props.position += 1);
    };

    return (
        <>
            <article key={props.user._id}>{props.user.email}</article>
            <button onClick={incriment}>Click</button>
        </>
    );
  };
  
  export default User;