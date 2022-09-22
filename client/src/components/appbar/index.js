import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";
import { firebase } from "./service/firebase";
import Login from "../login/Login";
import useDialogModal from "../../hooks/useDialogModal"
import { async } from "@firebase/util";


export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [LoginDialog, showLoginDialog] = useDialogModal(Login);

  const handelLogin = () =>{
    showLoginDialog();  
  }
  const handelLogout = async () =>{
   try {
    await firebase.logout();
   }catch (error){
    console.log(error)
   }

  }
  return (
    <>
      {matches ? <AppbarMobile 
      onLoginClick={handelLogin}
      onLogoutClick={handelLogout}
      matches={matches}
      /> :
       <AppbarDesktop 
       onLoginClick={handelLogin}
       onLogoutClick={handelLogout}
       matches={matches}/>}
       <LoginDialog/>
    </>
  );
}
