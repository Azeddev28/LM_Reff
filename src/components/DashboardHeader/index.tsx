import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import theme from '../../theme';
import SearchIcon from '@mui/icons-material/Search';
interface DashboardHeaderProps{
    heading:string,
    subHeading:string,
    placeHolder:string,
}

const Container= styled('div')(({theme }) => ({ 
   display:'flex',
   flexDirection:'column',
  //  backgroundColor:theme.header.background,
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
    // backgroundColor:"white",
    outline:'none',
    border:'none',
  }

 }));

const DashboardHeader = ({heading,subHeading,placeHolder}:DashboardHeaderProps) => {
  return (
    <Container>
      <Typography variant="h4">{heading}</Typography>
      <Typography>{subHeading}</Typography>
      <SearchBox>
        <Input placeholder={placeHolder}/>
        <SearchIcon fontSize="medium"/>
      </SearchBox>
    </Container>
  )
}

export default DashboardHeader