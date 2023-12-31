import Image from "next/image"

const Button = ({ label, iconURL, borderColor, backgroundColor, fullwidth, textColor }) => {
    return (
        <button className={`flex justify-center items-center gap-2 px-7 py-4 font-montserrat border text-lg leading-none ${backgroundColor ? `${backgroundColor} ${textColor} ${borderColor}` : ' bg-primary text-white border-primary'} rounded-full ${fullwidth && 'w-full'}`}>
            {label}
            {iconURL && <Image src={iconURL} alt="arrow right" className="ml-2 rounded-full w-5 h-5" />}
        </button>
    )
}

export default Button