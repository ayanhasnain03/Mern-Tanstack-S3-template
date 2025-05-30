import { CreateProduct } from "@/components/organisms/create-product"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
  <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      All Products
    </h1>

<CreateProduct/>


    </div>
  )
}

export default Home
