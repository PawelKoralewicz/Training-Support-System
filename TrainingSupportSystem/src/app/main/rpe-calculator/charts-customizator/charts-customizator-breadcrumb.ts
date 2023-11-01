import { MenuItem } from "primeng/api";
import { Icon } from "src/app/shared/enums/icons.enum";

export const breadcrumbItems: MenuItem[] = [
    {
        icon: Icon.CALCULATOR,
        label: " RPE Calculator",
        routerLink: "/rpe-calculator"
    }, 
    {
        icon: Icon.PENCIL,
        label: " Customize"
    }
]