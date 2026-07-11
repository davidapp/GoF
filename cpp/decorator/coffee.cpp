#include "coffee.h"

std::string Espresso::description() const { return "Espresso"; }
double Espresso::cost() const { return 18.0; }

std::string MilkDecorator::description() const { return inner_->description() + " + 牛奶"; }
double MilkDecorator::cost() const { return inner_->cost() + 4.0; }

std::string SugarDecorator::description() const { return inner_->description() + " + 糖"; }
double SugarDecorator::cost() const { return inner_->cost() + 2.0; }
