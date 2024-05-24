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

const ContainerChild= styled('div')(({ }) => ({ 
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  border: '1px solid #E1E3EA',
  marginBottom: '0px' ,
})); 

const SearchBox=styled('div')(({theme})=>({
 padding:"8px 16px 8px 0px ",
 border:`1px solid #E1E3EA`,
 display:'flex',
 gap:'8px',
 alignItems:"center",
 backgroundColor:'#FFFFFF',
 borderRadius:'9px',
 flexDirection:'row',
 width: '25%',
 height: '38px',
 background: '#FFFFFF',
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
      <Typography variant="h2" style={{ marginTop: "-20px", fontSize: "25px"}}>{heading}</Typography>
      <div style={{ borderBottom: '1px solid #E1E3EA', width: '100%', marginTop: '2.5vh', marginBottom: '3vh' }} />
      
      <ContainerChild>
      <Typography variant="h6">{subHeading}</Typography>
      <SearchBox>
        <Input placeholder={placeHolder} onChange={handleInputValue}/>
        <SearchIcon  style={{ cursor: 'pointer' }} fontSize="medium" onClick={handleSearchValue} />
      </SearchBox>
      </ContainerChild>

      
    </Container>
  )
}

export default DashboardHeader