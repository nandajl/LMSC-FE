import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import WhyUs from '../components/Whyus';
import OurCommitment from '../components/OurCommitment';
import StartNow from '../components/StartNow';
import Faq from '../components/Faq';
import Footer from '../components/Footer';


export const Home = () => {
  
  return (
    <div className='overflow-x-hidden relative pt-5'>
      <Navbar />
      <Header/>
      <WhyUs/>
      <StartNow/>
      <Faq/>
      <Footer/>
    </div>
  )
}
