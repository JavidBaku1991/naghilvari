import { Product } from '../types/product';


import baliqci from '../images/categories/paintings/baliqci.jpg';
import dolca from '../images/categories/paintings/dolca.jpg';
import guller from '../images/categories/paintings/guller.jpg';
import gunebaxa from '../images/categories/paintings/gunebaxan.jpg';
import karvan from '../images/categories/paintings/karvan.jpg';
import sahzade from '../images/categories/paintings/sahzade.jpg';
import sariBaliq from '../images/categories/paintings/sariBaliq.jpg';

// hsueyn muellim

import almalar from '../images/categories/paintings/huseyn/almalar.png';
import at from '../images/categories/paintings/huseyn/at.png';
import cengcalan from '../images/categories/paintings/huseyn/cengcalan.png';
import duet from '../images/categories/paintings/huseyn/duet.png';
import ipekyolu from '../images/categories/paintings/huseyn/ipekyolu.png';
import kuleyeqarsi from '../images/categories/paintings/huseyn/kuleyeqarsi.png';
import quslar from '../images/categories/paintings/huseyn/quslar.png';
import skripkaliqiz from '../images/categories/paintings/huseyn/skripkaliqiz.png';




const products: Product[] = [
  {
    id: "01",
    title: "Duet",
    description: "kağız, qələm, təbii rəng, akvarel",
    price: 1200,
    imageUrl: duet,
    category: "paintings",
    featured: true,
    artist: "Hüseyn Hacıyev",
    year: 2012,
    dimensions: "55:48"
  },
  {
    id: "02",
    title: "Küləyə qarşı",
    description: "qarışıq texnika",
    price: 300,
    imageUrl: kuleyeqarsi,
    category: "paintings",
    featured: true,
    artist: "Hüseyn Hacıyev",
    year: 2012,
    dimensions: "50:60"
  },
  {
    id: "03",
    title: "Quşlar",
    description: "qrafika",
    price: 400,
    imageUrl: quslar,
    category: "paintings",
    featured: false,
    artist: "Hüseyn Hacıyev",
    year: 2017,
    dimensions: "44.5:36"
  },
  {
    id: "04",
    title: "At",
    description: "qrafika",
    price: 250,
    imageUrl: at,
    category: "paintings",
    featured: false,
    artist: "Hüseyn Hacıyev",
    year: 2014,
    dimensions: "30:27"
  },
  {
    id: "05",
    title: "Cəng çalan qız",
    description: "miniatür",
    price: 400,
    imageUrl: cengcalan,
    category: "paintings",
    featured: false,
    artist: "Hüseyn Hacıyev",
    year: 2015,
    dimensions: "48:23.5"
  },
  {
    id: "06",
    title: "Skriplalı qız",
    description: "qrafika",
    price: 400,
    imageUrl: skripkaliqiz,
    category: "paintings",
    featured: false,
    artist: "Hüseyn Hacıyev",
    year: 2019,
    dimensions: "34.5:29.5"
  },
  {
    id: "1",
    title: "Akvarium",
    description: "",
    price: 550,
    imageUrl: sariBaliq,
    category: "paintings",
    featured: true,
    artist: "",
    year: 2023,
    dimensions: ""
  },
  {
    id: "07",
    title: "İpək yolu",
    description: "kağız, qələm, təbii rəng, akvarel",
    price: 800,
    imageUrl: ipekyolu,
    category: "paintings",
    featured: false,
    artist: "",
    year: 2015,
    dimensions: "78.6:30"
  },
  {
    id: "1.1",
    title: "Almalar",
    description: "Yağlı boya",
    price: 1000,
    imageUrl: almalar,
    category: "paintings",
    featured: true,
    artist: "Hüseyn Hacıyev",
    year: 2023,
    dimensions: "73-67"
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
    images: [sahzade]
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
    images: [guller]
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
    images: [gunebaxa]
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
    images: [karvan]
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
    images: [dolca]
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
    images: [baliqci]
  }
];

export default products; 