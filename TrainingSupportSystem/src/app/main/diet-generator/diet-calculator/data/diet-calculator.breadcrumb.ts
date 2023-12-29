import { MenuItem } from "primeng/api";
import { Icon } from "src/app/shared/enums/icons.enum";

export const homeBreadcrumbDC: MenuItem = {
    icon: Icon.HOME,
    routerLink: '/dieting'
}

export const dietCalculatorBreadcrumb: MenuItem[] = [
    {
        icon: Icon.CALCULATOR,
        label: " Dieting calculator",
    }
]