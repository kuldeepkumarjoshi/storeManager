package com.storeManager.search.property.operator;

public enum FilterGroupOperatorType {
	AND, OR;

	@Override
	public String toString() {
		switch (this) {
		case AND:
			return "&&";
		case OR:
			return "||";
		default:
			return null;
		}
	}

}
