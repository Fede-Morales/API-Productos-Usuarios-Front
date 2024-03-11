import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


const required = (value) =>{
    if(!value){
        return (<div className="alert alert-danger" role="alert"> Este campo es obligatorio </div>);
    }
};



class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            nombre: '',
            precio: ''
        };
    }  
    

    componentDidMount() {

        const { token } = JSON.parse(localStorage.getItem('user'))

        axios.get('http://localhost:8080/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            this.setState({ productos: response.data });
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
    }

    handleDeleteProducto = (id) => {

        alert("Producto Eliminado");
        const { token } = JSON.parse(localStorage.getItem('user'));

        axios.delete(`http://localhost:8080/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // Eliminar el producto de la lista local de productos
            this.setState(prevState => ({
                productos: prevState.productos.filter(producto => producto.id !== id)
            }));
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }

    handleNombreChange = (event) => {
        this.setState({ nombre: event.target.value });
    }

    handlePrecioChange = (event) => {
        this.setState({ precio: event.target.value });
    }

    handleCrearProducto = () => {
        const { nombre, precio } = this.state;
        const { token } = JSON.parse(localStorage.getItem('user'));

        const nuevoProducto = {
            nombre: nombre,
            precio: parseFloat(precio)
        };

        axios.post('http://localhost:8080/products', nuevoProducto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        alert("Producto creado")
        window.location.reload();
    }


    render() {
         const { productos, nombre, precio } = this.state;
        

        /*<li key={producto.id}>
        {producto.nombre} - Precio: ${producto.precio}
        </li>*/


        return (
            <div className="container">
               
                
                <h2 className="mt-4 mb-4">Productos</h2>
                <div className="mb-3">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} 
                    onChange={this.handleNombreChange} validations= {[required, nombre]}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" className="form-control" id="precio" value={precio} 
                    onChange={this.handlePrecioChange} validations= {[required, precio]}/>
                </div>
               
                    
                    <button className="btn btn-primary mb-3" onClick={this.handleCrearProducto}>Crear Producto</button>
           
                <div className="row">
                    {productos.map(producto => (
                        <div className="col-md-4 mb-3" key={producto.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre}</h5>
                                    <p className="card-text">Precio: ${producto.precio}</p>
                                    <button className="btn btn-danger" onClick={() => this.handleDeleteProducto(producto.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { token  } = state.auth;
    return {
        token
    };
}

export default connect(mapStateToProps)(Productos);