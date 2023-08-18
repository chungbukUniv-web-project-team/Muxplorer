function Footer(){
    return(
            <footer style={{ backgroundColor: "black", color: "white", textAlign: "center", padding: "1rem" }}>
                &copy; {new Date().getFullYear()} Muxplore
                <p>충북대학교 몰입교육</p>
            </footer>
    );
}
export default Footer;