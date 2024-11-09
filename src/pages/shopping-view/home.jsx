import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 3500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 3500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div> */}
      <section className='bg-cover bg-center md:min-h-[calc(100vh)] min-h-[calc(90vh-110px)] pt-10 pb-10 md:-mt-20 -mt-40' style={{ backgroundImage: `url(https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770082/assets/eqfltjgvd2ykkzhaltzq.jpg)` }}>
        <h1 className='ml-5 md:ml-0 flex justify-center text-white md:text-7xl text-5xl michroma-regular uppercase mt-60'>Aura Threads</h1>
        <h1 className='ml-5 md:ml-0 flex justify-center text-white md:text-4xl text-2xl mt-5 michroma-regular'>Wear your Imagination</h1>
      </section>

      <div className='h-10 -mb-5'></div>

      <section className="relative md:h-screen md:flex justify-between items-center overflow-hidden md:pt-10">
        <div className="w-1/2 bg-white bg-cover bg-center transform items-center justify-center md:-ml-20 md:-mr-20 md:relative md:-mt-20 ">
          <div className='md:pt-8 -mr-80'>
            <Slider {...settings1}>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770076/assets/yhrfhq7a9u4g9p2if7zq.jpg' alt="Slide 1" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770075/assets/i3ssasrikkc84akf5say.jpg' alt="Slide 2" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770073/assets/ui0wl74zmhoi0ogbeea0.jpg' alt="Slide 3" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770072/assets/forkq9cykibvhmt6km66.jpg' alt="Slide 4" />
              </div>
            </Slider>
          </div>

          <div className='-mr-80'>
            <Slider {...settings2}>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770071/assets/ivbvrcvy68xnbaxrbmpm.jpg' alt="Slide 1" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770070/assets/uw3qiehnxk5chifie532.jpg' alt="Slide 2" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770064/assets/xpfcbu6sb3unuwjfkdea.jpg' alt="Slide 3" />
              </div>
              <div className='h-80 px-2'>
                <img src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770041/assets/clyjyumttdaqgs1zejjw.jpg' alt="Slide 4" />
              </div>
            </Slider>
          </div>
        </div>

        <div className="md:w-1/2 bg-white md:bg-cover md:bg-center md:transform md:rotate-12 flex md:items-center md:justify-center md:-mt-40 md:-mr-20 md:pl-4">
          <div className="absolute top-0 left-0 z-10 md:-rotate-12 md:mt-40 md:px-20 md:py-60">
            <h1 className="md:text-7xl text-3xl md:text-white font-bold montserrat-Italic mt-40 md:mt-0 pt-5 md:pt-0 ml-5 md:ml-0">Unleash Your Inner Vogue</h1>
            <button className='md:mt-10 border-white md:bg-white bg-gray-800 md:text-black text-white md:ml-40 ml-60 px-6 py-3 hover:scale-110 md:hover:bg-gray-800 hover:bg-gray-200 md:hover:text-white hover:text-black'>Shop Now</button>
          </div>
          <img className="opacity-80 hidden md:block" src='https://res.cloudinary.com/df8vrgj1b/image/upload/v1729770074/assets/yzmboyem0ushxxh113ej.jpg' alt="Right" />
        </div>
      </section>



      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
