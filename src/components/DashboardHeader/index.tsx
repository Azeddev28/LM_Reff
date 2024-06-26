import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, ChangeEvent } from "react";
interface DashboardHeaderProps {
  heading: string,
  subHeading: string,
  placeHolder: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>
}

const Container = styled('div')(({ }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const ContainerChild = styled('div')(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  border: '1px solid #E1E3EA',
  marginBottom: '0px',
}));

const SearchBox = styled('div')(({ theme }) => ({
  padding: "8px 16px 8px 0px ",
  border: `1px solid #E1E3EA`,
  display: 'flex',
  gap: '8px',
  alignItems: "center",
  backgroundColor: '#FFFFFF',
  borderRadius: '9px',
  flexDirection: 'row',
  width: '25%',
  height: '35px',
  background: '#FFFFFF',
}));

const Input = styled('input')(({ }) => ({
  padding: "8px 16px",
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  outline: 'none',
  border: 'none',
  height: "30px",
  backgroundColor: "white",
  ":focus": {
    outline: 'none',
    border: 'none',
  },
  fontSize: '13px'

}));




const DashboardHeader = ({ heading, subHeading, placeHolder, setSearchValue }: DashboardHeaderProps) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchValue(event.target.value);
    if (event.target.value === '') {
      setSearchValue(null);
    }
  }

  const handleSearchValue = () => {
    setSearchValue(inputValue);
  }

  return (
    <Container>
      <Typography variant="h2" style={{ marginBottom: "30px", marginTop: "0px", fontSize: "25px", fontWeight: "500", marginLeft: "-4.6%", width: "108%", height: "65px", borderBottom: "1px solid #F1F1F2" }}><span style={{ marginLeft: "65px" }}>{heading}</span></Typography>
      <ContainerChild>
        <Typography variant="h6" style={{ fontSize: "15px", fontWeight: "600" }}>{subHeading}</Typography>
        <SearchBox>
          <SearchIcon style={{ cursor: 'pointer', marginLeft: "10px" }} fontSize="medium" onClick={handleSearchValue} />
          <Input placeholder={placeHolder} onChange={handleInputValue} />
        </SearchBox>
      </ContainerChild>
    </Container>
  )
}

export default DashboardHeader