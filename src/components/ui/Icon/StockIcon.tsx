import { SvgIcon, SvgIconProps } from "@mui/material";

function StockIcon(props: SvgIconProps) {
    return (
        <SvgIcon
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M1.66699 1.6665V15.8332C1.66699 17.2165 2.78366 18.3332 4.16699 18.3332H18.3337" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16699 14.1668L7.99199 9.70017C8.62533 8.96684 9.75033 8.91683 10.4337 9.60849L11.2253 10.4002C11.9087 11.0835 13.0337 11.0418 13.667 10.3085L17.5003 5.8335" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    )
}
export default StockIcon;
