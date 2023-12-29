import { MenuItem } from "primeng/api";
import { Icon } from "src/app/shared/enums/icons.enum";

export const homeBreadcrumbPC: MenuItem = {
    icon: Icon.HOME,
    routerLink: '/training'
}

export const planCreatorBreadcrumbItems: MenuItem[] = [
    {
        label: ' Plan creator',
        icon: Icon.PENCIL,
    }
]