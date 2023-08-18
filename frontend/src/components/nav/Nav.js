function Nav(){
    return(
        <nav style={{ backgroundColor: "#444", padding: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <a href="/login" style={{ color: "#fff", marginLeft: "1rem" }} /* onClick={() => handlePageChange('login')}*/ >로그인</a>
                <a href="/signup" style={{ color: "#fff", marginLeft: "1rem" }} /*onClick={() => handlePageChange('signup')}*/ >회원가입</a>
            </nav>
    );
}

export default Nav;
