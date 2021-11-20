import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Blue hike shoes",
                "src": "https://media.istockphoto.com/photos/running-shoes-picture-id1249496770?b=1&k=20&m=1249496770&s=170667a&w=0&h=_SUv4odBqZIzcXvdK9rqhPBIenbyBspPFiQOSDRi-RI=",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 30,
                "colors": ["blue"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Red blunder shoes",
                "src": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 40,
                "colors": ["red"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Lovely Maroon",
                "src": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 29,
                "colors": ["marron"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Black is beauty",
                "src": "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 49,
                "colors": ["black"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Light white",
                "src": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 29,
                "colors": ["White"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Grey say",
                "src": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                "description": "Welcome to our stunning shoes collection.",
                "content": "Welcome to our stunning shoes collection. Wear shoes of your comfort and choice make you feel awesome and happy.We make you feel special",
                "price": 39,
                "colors": ["Gray"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


