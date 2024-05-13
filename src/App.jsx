import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NeomWebsite from './NeomWebsite'

function App() {

	return (
		<GoogleOAuthProvider clientId="626017652645-u1tte85k56p6h0bs6b2fhl4jbhg7lq34.apps.googleusercontent.com">
      <NeomWebsite />
		</GoogleOAuthProvider>
	);
}

export default App;




