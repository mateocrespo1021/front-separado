import { Subscription } from "./subscription.interface";

export interface TenantSubscription {
    id:              number;
    tel:             string;
    terms_accepted:  number;
    business_name:   string;
    country:         string;
    id_user:         number;
    created_at:      null;
    updated_at:      Date;
    address:         string;
    social_networks: string;
    logo:            string;
    schedule:        string;
    orders_options:  string;
    currency:        string;
    subscription:    Subscription;
}


