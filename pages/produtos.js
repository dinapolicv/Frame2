import React from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import { Card, CardBody, CardTitle } from 'reactstrap';
import Link from 'next/link';

function Prod({prod}){
    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                {prod.map((prod) => (
                    <div className={styles.card}>
                        <Link href='/produtos/[id]'as={`/produtos/${prod.id}`} >
                            <Card>
                                <CardTitle>
                                    <p>{prod.title}</p>
                                </CardTitle>
                                <img src={prod.image} width="100%"/> 
                                <CardBody>
                                    <p>R${prod.price}</p>
                                </CardBody>  
                                <CardBody>
                                    Nota: {prod.rating.rate}/5 ({prod.rating.count})
                                </CardBody>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps (context) {
    const response = await axios.get(
        'https://fakestoreapi.com/products'
    );
    const data = await response.data;
    return {
        props: {prod: data},
    }
}
export default Prod;