export interface IValues {
	[key: string]: string;
}

export type TLongRuleExpression<M> = {
	value: M;
	message: string;
};

export type TRuleExpression<N> = TLongRuleExpression<N> | N;

export interface IRule {
	required?: TRuleExpression<boolean>;
	isEmail?: TRuleExpression<boolean>;
	isPhone?: TRuleExpression<boolean>;
	isPassword?: TRuleExpression<boolean>;
	matchField?: TRuleExpression<string>;
	differValue?: TRuleExpression<string>;
	custom?: TRuleExpression<(value: string) => string | void | Promise<string | void | undefined>>;
}

export type TRules<T extends IValues> = {
	[key in keyof T]?: IRule;
};
