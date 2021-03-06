import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Product = ({ product }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteProduct();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);
    
    const close = () => setConfirm(false);

    const deleteProduct = async () => {
        try {
            const deleted = await fetch(`https://atn-manage-terminatorxxd.vercel.app/api/products/${router.query.id}`, {
                method: "Delete"
            });

            router.push("/product");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="product-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{product.data.name}</h1>
                    <h3>Product description: <span>{product.data.description}</span></h3>
                    <h3>Product quantity: <span>{product.data.quantity}</span></h3>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export const getServerSideProps = async ({ query: { id } }) => {
    const res = await fetch(`https://atn-manage-terminatorxxd.vercel.app/api/products/${id}`);
    const product = await res.json();
  
    return{
      props: {product}
    }
}

export default Product;