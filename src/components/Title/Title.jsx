

const Title = ({title, subtitle}) => {
    return (
        <div className="my-10  border-y-4 py-4 md:w-2/6 mx-auto ">
            <h1 className="text-center mb-2 text-orange-500">------{title}----- </h1>
            <h1 className="text-center uppercase text-3xl font-bold">{subtitle}</h1>
            
        <div>

        </div>
        </div>
    );
};

export default Title;