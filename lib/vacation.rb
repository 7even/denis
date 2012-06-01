class Vacation < Sequel::Model
  def self.to_hash
    self.map do |vacation|
      {start: vacation.start, end: vacation.end}
    end
  end
end
