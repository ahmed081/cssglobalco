import type {ButtonData} from "../../types/content.types";

const classByVariant = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    gold: "btn-gold",
};

export function Button({label, href, variant = "primary"}: ButtonData) {
    return (
        <a className={classByVariant[variant]} href={href}>
            {label}
        </a>
    );
}
