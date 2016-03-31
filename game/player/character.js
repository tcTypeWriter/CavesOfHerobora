
module.exports = Character;

function Character(argument) {
    this.exp = new State(10, 100, 1 , "violet");
    this.strength = new State(10, 100, 1, "red");
    this.dexterity = new State(15, 100, 1, "blue");
    this.vitality = new State(12, 100, 1, "green");
}

function State(val, max, lvl, color)
{
    this.val = val;
    this.max = max;
    this.lvl = lvl;
    this.color = color;
}