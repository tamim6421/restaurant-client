import { useState } from 'react';
import Cover from '../../../Shared/Cover/Cover';
import orderCover from '../../../assets/shop/banner2.jpg'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const {category} = useParams()
  const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu()


    const dessert = menu.filter( item => item.category === 'dessert')
    const salad = menu.filter( item => item.category === 'salad')
    const soup = menu.filter( item => item.category === 'soup')
    const pizza = menu.filter( item => item.category === 'pizza')
    const offered = menu.filter( item => item.category === 'offered')
    const drinks = menu.filter( item => item.category === 'drinks')


    return (
        <div >
          <Helmet>
            <title> Boss | Order </title>
          </Helmet>
            <Cover img={orderCover} title={"Order Food"}></Cover>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className='mt-20 mb-10 text-center border-b-2'>
        <Tab>Salad</Tab>
        <Tab>Pizza</Tab>
        <Tab>Soup</Tab>
        <Tab>Desert</Tab>
        <Tab>Drinks</Tab>
      </TabList>

      <TabPanel>
      <OrderTab item={salad}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab item={pizza}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab item={soup}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab item={dessert}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab item={drinks}></OrderTab>
      </TabPanel>
    </Tabs>
        </div>
    );
};

export default Order;