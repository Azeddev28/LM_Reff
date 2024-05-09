import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState , ChangeEvent  } from "react";
interface DashboardHeaderProps{
    heading:string,
    subHeading:string,
    placeHolder:string,
    setSearchValue:React.Dispatch<React.SetStateAction<string | null>>
}

const Container= styled('div')(({ }) => ({ 
   display:'flex',
   flexDirection:'column',
   gap:'10px',
})); 

const SearchBox=styled('div')(({theme})=>({
 padding:"8px 16px 8px 0px ",
 border:`1px solid ${theme.header.background}`,
 display:'flex',
 gap:'10px',
 alignItems:"center",
 backgroundColor:'white',
 borderRadius:'10px',
 flexDirection:'row',
  marginTop:'30px',
}));

const Input=styled('input')(({})=>({
  padding:"8px 16px",
  display:'flex',
  width:'100%',
  flexDirection:'row',
  outline:'none',
  border:'none',
  height:"30px",
  backgroundColor:"white",
  ":focus":{
    outline:'none',
    border:'none',
  }

 }));




const DashboardHeader = ({heading,subHeading,placeHolder, setSearchValue}:DashboardHeaderProps) => {
  const [inputValue,setInputValue]=useState<string | null>(null);
  
  const handleInputValue=(event:ChangeEvent<HTMLInputElement>)=>{
    setInputValue(event.target.value);
    setSearchValue(event.target.value);
    if(event.target.value === ''){
      setSearchValue(null);
    }
  } 

  const handleSearchValue=()=>{
    setSearchValue(inputValue); 
  }




  return (
    <Container>
      <Typography variant="h4">{heading}</Typography>
      <Typography>{subHeading}</Typography>
      <SearchBox>
        <Input placeholder={placeHolder} onChange={handleInputValue}/>
        <SearchIcon  style={{ cursor: 'pointer' }} fontSize="medium" onClick={handleSearchValue} />
      </SearchBox>
    </Container>
  )
}

export default DashboardHeader