const Wrapper = ({ children, className }) => {
    return (
        <div className={`w-full 2xl:max-w-[1536px] xl:max-w-[1440px] px-wrapper mx-auto ${className || ""}`}>
            {children}
        </div>
    )
}

export default Wrapper