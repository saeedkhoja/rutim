import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import { FinalCta, How, Offer, Who } from './components/Sections'
import Products from './components/Products'
import ProductModal from './components/ProductModal'
import LeadModal from './components/LeadModal'
import { Footer, MobileBar } from './components/Chrome'

export default function App() {
  const [active, setActive] = useState(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Offer />
        <Products onOpen={setActive} />
        <Who />
        <How />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      {active && <ProductModal key={active} model={active} onClose={() => setActive(null)} />}
      <LeadModal />
    </>
  )
}
