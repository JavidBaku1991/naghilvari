import { Product } from '../types/product';
import paint2 from '../images/paint2.jpg';
import ceramics from '../images/categories/ceramics.jpg';
import sculptures from '../images/categories/sculptures.jpg';
import hero13 from '../images/hero13.png';
import pottery from '../images/pottery.png';
import baliqci from '../images/categories/paintings/baliqci.jpg';
import dolca from '../images/categories/paintings/dolca.jpg';
import guller from '../images/categories/paintings/guller.jpg';
import gunebaxa from '../images/categories/paintings/gunebaxan.jpg';
import karvan from '../images/categories/paintings/karvan.jpg';
import sahzade from '../images/categories/paintings/sahzade.jpg';
import sariBaliq from '../images/categories/paintings/sariBaliq.jpg'


const products: Product[] = [
  {
    id: "1",
    title: "Akvarium",
    description: "",
    price: 250,
    imageUrl: sariBaliq,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "",
    images: [sariBaliq, paint2]
  },
  {
    id: "2",
    title: "Şah",
    description: "",
    price: 250,
    imageUrl: sahzade,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "71:58",
    images: [sahzade, hero13]
  },
  {
    id: "3",
    title: "Ərik ağacı",
    description: "",
    price: 200,
    imageUrl: guller,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "55:48",
    images: [guller, ceramics]
  },
  {
    id: "4",
    title: "Günəbaxan",
    description: "",
    price: 200,
    imageUrl: gunebaxa,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "",
    images: [gunebaxa, pottery]
  },
  {
    id: "5",
    title: "Zəvvarlar",
    description: "",
    price: 190,
    imageUrl: karvan,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "27:60",
    images: [karvan, hero13]
  },
  {
    id: "6",
    title: "Pəncərə",
    description: "",
    price: 200,
    imageUrl: dolca,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "58:74",
    images: [dolca, hero13]
  },
  {
    id: "7",
    title: "Balıqçı qadın",
    description: "",
    price: 270,
    imageUrl: baliqci,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: "45:42",
    images: [baliqci, hero13]
  }
];

export default products; 