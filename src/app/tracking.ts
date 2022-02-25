export interface Tracking {
    Parameter: string;
    Point_Estimate: number;
    Standard_Error: number;
    Lower_CI: number;
    Upper_CI: number;
    group_key: string;
    Date_of_computation: string;
    seag: number,
    mileage: number,
    total_cost: number,
    strata_unique_id: number,
    vehicle_production_date: string,
    vehi_engine_series: number,
    days_to_failure: number,
    month_to_failure: number,
    paginator:string;
}
