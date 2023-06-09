import { Button,
   Box,
    Grid,
     GridItem,
      Image,
       Text,
        Flex,
         useDisclosure,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  useBreakpointValue,
  Stack, Checkbox} from '@chakra-ui/react';
  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    useColorModeValue
  } from '@chakra-ui/react'
  import { SearchIcon, AddIcon, RepeatIcon } from "@chakra-ui/icons";
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AdminGetProduct } from '../AdminRedux/Action';
import axios from 'axios';
import useThrottle from '../hook/useThrottle';
import EditProduct from '../AdminComponent/EditProduct';
import { useSearchParams } from 'react-router-dom';
import AdminAddProduct from '../AdminComponent/AdminAddProduct';



const AdminProduct = () => {
  const [del,setDel]=useState(false)
  const [searchParams,setSearchParams]=useSearchParams([])
  const dispatch = useDispatch()
    const { products } = useSelector(store => store.AdminReducer)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [query, setQuery] = useState('')
  const searchQuery = useThrottle(query, 1000)
  const isMobile = useBreakpointValue({ base: true, md: false });
 
  const initialCategory=searchParams.getAll("category")

  const initialSort=searchParams.getAll("order")
  const [order,setOrder]=useState(initialSort||"")

    const [category,setCategory]=useState(initialCategory||[])

    const shadow = useColorModeValue(' 2px solid lightblue','1px solid white' );

  const handleChange=(e)=>{
    let newCategory=[...category]
    const value=e.target.value;
 if(newCategory.includes(value)){
    newCategory=newCategory.filter((el)=>el!==value)
 }else{
    newCategory.push(value)
 }

     setCategory(newCategory);
 }
  const handleSort=(e)=>{
   setOrder(e.target.value)
  }

  let obj={
    params:{
        category:searchParams.getAll("category"),
        _sort:searchParams.get("order")&&"price",
        _order:searchParams.get("order"),

      }
 }
 const deleteProduct=()=>{
 setDel(!del)
 }

 
  useEffect(() => {

    dispatch(AdminGetProduct(searchQuery,obj))
 
  }, [searchQuery,category,order,del])

  useEffect(()=>{
    let params={
        category
    }
    order&&(params.order=order);
    setSearchParams(params)
 },[category,order])
 console.log(products)
  return (
    <>
  
      
       <Box>
      <Box>
        <Flex
          alignItems="center"
          justifyContent={isMobile ? "space-between" : "flex-start"}
          flexDirection={isMobile ? "column" : "row"}
        >
          <InputGroup maxW="md">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
          {!isMobile && (
            <>
              <Spacer />
              <Select
                placeholder="Sort by"
               
                onChange={handleSort}
                maxW="xs"
                ml={4}
              >
                <option value="desc" >Low To High</option>
                <option value="asc">High To Low</option>

              </Select>
              <Spacer />
              <Menu>
       <MenuButton as={Button} >
    Filter
        </MenuButton>
      <MenuList>
    <MenuItem><Checkbox  value={"electronic"} onChange={handleChange} isChecked={category.includes("electronic")}>Electronic</Checkbox></MenuItem>
    <MenuItem><Checkbox  value={"TV"} onChange={handleChange} isChecked={category.includes("TV")} >TV</Checkbox></MenuItem>
    <MenuItem><Checkbox  value={"phone"} onChange={handleChange} isChecked={category.includes("phone")}>Smartphone</Checkbox></MenuItem>
    <MenuItem><Checkbox  value={"android"} onChange={handleChange} isChecked={category.includes("android")}>Android</Checkbox></MenuItem>
  </MenuList>
         </Menu>
            </>
          )}
          <Spacer />
          <Flex>
            
          <AdminAddProduct/>
          </Flex>
        </Flex>
      </Box>
          
          <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} p={"3"} gap={6}>
       
        
       {products?.map((product) => (
        <Box boxShadow="white" border={shadow}key={product.id}>
       <Flex  >
         <Image m={3} w={"100px"} h={"100px"} objectFit={"contain"} src={product.imgUrl} alt={product.title}/>
         <Stack mx={2}>
                       <Text fontSize={"15px"} colorScheme={"black.300"}>{product.title.substr(0, 29)}...</Text>
                       <Text fontSize={"15px"} colorScheme={"black.300"}>Price: ${product.price}</Text>
                       <Flex>
                         <EditProduct item={product} delData={deleteProduct} />
                       </Flex>
                     </Stack>
       </Flex>
</Box>
       ))}
       
     </Grid>
     </Box>
      
    </>
  )
}
export default AdminProduct
