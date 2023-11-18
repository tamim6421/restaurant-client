

const Test = () => {
    let marks = 30;
    return (
        <div>
            <p className="pt-20"></p>
            <h2>
                {new Date().getTime()}
                <button onClick={() => alert('hello')}>button</button>

                <p style={{
                    color:'white',
                    background:'orange',
                    width:'500px',
                    margin:'auto'
                }}>this is inline css</p>

            </h2>

            <div>
              {( () =>{
                if(marks >= 60 && marks < 100){
                    return <h3>You got A-</h3>
                }else if(marks < 40)
                return <h2>You got B Grate</h2>
                    }
              )()}
            </div>
        </div>
    );
};

export default Test;