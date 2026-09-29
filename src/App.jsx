import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import { Demand, Faq, How, Offer, Pain, Support, Who } from './components/Sections'
import Catalog from './components/Catalog'
import Kits from './components/Kits'
import PowerCalc from './components/PowerCalc'
import ProductModal from './components/ProductModal'
import LeadForm from './components/LeadForm'
import { CartDrawer, Footer, MobileBar, Toast } from './components/Chrome'

export default function App() {
  const [active, setActive] = useState(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <Offer />
        <How />
        <Who />
        <Catalog onOpen={setActive} />
        <Kits onOpen={setActive} />
        <PowerCalc onOpen={setActive} />
        <Demand />
        <Support />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <MobileBar />
      {active && <ProductModal key={active} model={active} onClose={() => setActive(null)} />}
    </>
  )
}
