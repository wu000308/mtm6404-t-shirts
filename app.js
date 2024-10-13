const { useState } = React;

function Tshirt({ tshirt, onBuy }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  return (
    <div className="card mb-3">
      <img
        src={`./images/${tshirt.image}`}
        className="card-img-top"
        alt={tshirt.title}
      />
      <div className="card-body">
        <h5 className="card-title">{tshirt.title}</h5>
        <p className="card-text">Price: ${tshirt.price.toFixed(2)}</p>
        <p className="card-text">
          {tshirt.stock > 0 ? `${tshirt.stock} in stock` : 'Out of Stock'}
        </p>

        {tshirt.stock > 0 && (
          <div className="input-group mb-3">
            <select
              className="form-select"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            >
              {[...Array(tshirt.stock).keys()].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              onClick={() => onBuy(selectedQuantity)}
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TshirtStore() {
 
  const [tshirts, setTshirts] = useState([
    { title: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 10.99, stock: 6 },
    { title: 'Red T-Shirt', image: 'red-t-shirt.jpg', price: 20.99, stock: 2 },
    { title: 'Green T-Shirt', image: 'green-t-shirt.jpg', price: 30.99, stock: 3 },
    { title: 'Purple T-Shirt', image: 'purple-t-shirt.jpg', price: 25.99, stock: 3 },
    { title: 'Teal T-Shirt', image: 'teal-t-shirt.jpg', price: 23.99, stock: 1 },
  ]);

  // Function to handle the Buy button click
  const handleBuy = (index, quantity) => {
    const updatedTshirts = [...tshirts]; 
    updatedTshirts[index].stock -= quantity;
    setTshirts(updatedTshirts); 
  };

  return (
    <div className="row">
      {tshirts.map((tshirt, index) => (
        <div key={index} className="col-md-4">
          <Tshirt tshirt={tshirt} onBuy={(quantity) => handleBuy(index, quantity)} />
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(<TshirtStore />, document.getElementById('root'));
