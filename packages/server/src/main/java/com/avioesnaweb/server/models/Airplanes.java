package com.avioesnaweb.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "airplanes")
public class Airplanes {
    @Id
    private String id;
    private String Title;
    private String Role;
    @Field("First Flight")
    private String firstFlight;
    private String Crew;
    private String Length;
    private String Wingspan;
    private String Height;
    @Field("Empty weight")
    private String emptyWeight;
    @Field("Maximum speed")
    private String maximumSpeed;
    @Field("Cruise speed")
    private String cruiseSpeed;
    private String Image;
    private String Source;

    public Airplanes() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return Title; }
    public void setTitle(String Title) { this.Title = Title; }

    public String getRole() { return Role; }
    public void setRole(String Role) { this.Role = Role; }

    public String getFirstFlight() { return firstFlight; }
    public void setFirstFlight(String firstFlight) { this.firstFlight = firstFlight; }

    public String getCrew() { return Crew; }
    public void setCrew(String Crew) {this.Crew = Crew; }

    public String getLength() { return Length; }
    public void setLength(String Length) { this.Length = Length; }

    public String getWingspan() { return Wingspan; }
    public void setWingspan(String Wingspan) { this.Wingspan = Wingspan; }

    public String getHeight() { return Height; }
    public void setHeight(String Height) { this.Height = Height; }

    public String getEmptyWeight() { return emptyWeight; }
    public void setEmptyWeight(String emptyWeight) { this.emptyWeight = emptyWeight; }

    public String getMaximumSpeed() { return maximumSpeed; }
    public void setMaximumSpeed(String maximumSpeed) { this.maximumSpeed = maximumSpeed; }

    public String getCruiseSpeed() { return cruiseSpeed; }
    public void setCruiseSpeed(String cruiseSpeed) { this.cruiseSpeed = cruiseSpeed; }

    public String getImage() { return Image; }
    public void setImage(String Image) { this.Image = Image; }

    public String getSource() { return Source; }
    public void setSource(String Source) { this.Source = Source; }
}
