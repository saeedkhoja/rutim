import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import { About, Faq, Reviews, Risk, Segment, Why } from './components/Sections'
import Products from './components/Products'
import ProductModal from './components/ProductModal'
import LeadForm from './components/LeadForm'
import { Footer, MobileBar } from './components/Chrome'

export default function App() {
  const [active, setActive] = useState(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Calculator />
        <Risk />
        <Why />
        <Segment />
        <Products onOpen={setActive} />
        <Reviews />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <MobileBar />
      {active && <ProductModal key={active} model={active} onClose={() => setActive(null)} />}
    </>
  )
}
