export type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
};
