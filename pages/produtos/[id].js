import axios from 'axios';
import Router from 'next/router';
import styles from '../../styles/Home.module.css'
function Produ({prod = {}}){
    return <div className={styles.main}>
                <div className={styles.card1}>
                    <h1>{prod.title}</h1>
                    <div className={styles.form}>
                        <img src={prod.image} width="100%"/>
                        <h2>R$ {prod.price}</h2>
                    </div>
                    <div className={styles.form}>
                        <h3>{prod.description}</h3> 
                    </div>
                </div>
            </div>
}
export async function getStaticProps (context){
    const response = await axios.get(
        'https://fakestoreapi.com/products/'+context.params.id
    );
    const prod = await response.data;
    return {
        props: {prod}
    }
}
export async function getStaticPaths() {
    const response = await axios.get(
        'https://fakestoreapi.com/products'
    );
    const prod = await response.data;
    const paths = prod.map((prod) => {
        return {params:{id:String(prod.id)}};
    });
    return {
        paths,
        fallback: true,
    };
}
export default Produ;