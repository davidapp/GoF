#include "book_collection.h"

void BookCollection::add(Book book) { books_.push_back(std::move(book)); }
